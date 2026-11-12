<<<<<<< HEAD
Almost overall code is written 
=======

## PayTM Wallet

A React/Vite wallet frontend and Express/Mongoose API. The API provides account creation, sign-in, user search, balance lookup, and authenticated transfers. Transfers are sent in paise and committed in a MongoDB transaction.

### Requirements

- Node.js 18 or newer
- MongoDB configured as a replica set (MongoDB Atlas works, or use the included `Dockerfile`)

### Configure the backend

Copy `backend/.env.example` to `backend/.env` and set a private JWT secret:

```env
MONGO_URI=mongodb://localhost:27017/paytm?replicaSet=rs
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
```

The included `Dockerfile` starts a MongoDB replica set named `rs`. Start it with `docker build -t paytm-mongo .` and `docker run --name paytm-mongo -p 27017:27017 paytm-mongo`.

### Run locally

In one terminal:

```sh
cd backend
npm install
npm start
```

In another terminal:

```sh
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the frontend terminal. Set `VITE_API_URL` in `frontend/.env` only when the API is not at `http://localhost:5000/api/v1`.

New accounts start with a zero balance. Deposits and withdrawals are not implemented; add funds through an authorized application flow before testing outgoing transfers.

