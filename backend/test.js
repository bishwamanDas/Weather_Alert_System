fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@weatherguard.com', password: 'admin123' })
}).then(r => r.json().then(d => console.log(r.status, d))).catch(console.error)
