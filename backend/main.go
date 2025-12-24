package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"time"
)

type RandomRequest struct {
	Count int `json:"count"`
}

type RandomResponse struct {
	Result int `json:"result"`
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func randomHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RandomRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Count < 1 {
		http.Error(w, "Count must be at least 1", http.StatusBadRequest)
		return
	}

	// Generate random number between 1 and count (inclusive)
	result := rand.Intn(req.Count) + 1

	response := RandomResponse{Result: result}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	// Seed the random number generator
	rand.Seed(time.Now().UnixNano())

	http.HandleFunc("/random", randomHandler)

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

