# Random Name Picker Wheel

A simple random name picker application with a colorful spinning wheel interface.

## Features

- **Backend**: Golang REST API that returns a random number
- **Frontend**: React application with an interactive wheel visualization
- Enter names (one per line) and spin the wheel to pick a random winner

## How to Run

### Using Docker Compose (Recommended)

```bash
docker-compose up --build
```

Then open your browser to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### Running Locally

#### Backend
```bash
cd backend
go run main.go
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## Usage

1. Enter names in the left column (one name per line)
2. Watch the wheel update automatically with colorful segments
3. Click the "SPIN" button to pick a random winner
4. The wheel will spin and highlight the selected name

## API Endpoint

**POST** `/random`

Request body:
```json
{
  "count": 5
}
```

Response:
```json
{
  "result": 3
}
```

Returns a random integer between 1 and `count` (inclusive).

