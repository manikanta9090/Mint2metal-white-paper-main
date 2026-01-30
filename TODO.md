# TODO: Add "Join Whitelist" Feature to Mint2Metal Whitepaper

## Frontend Modifications (index.html)
- [x] Add "Join Whitelist" button to navbar (right-aligned)
- [x] Add glassmorphism modal HTML structure for whitelist form
- [x] Add CSS styles for modal (matching dark/silver theme)
- [x] Add JavaScript for modal functionality (open/close)
- [x] Add form validation (email required, valid format)
- [x] Add API call to POST /api/whitelist on submit
- [x] Add loading, success, and error states in modal
- [x] Close modal on success after 2 seconds

## Backend Implementation
- [ ] Create server.js with Express setup
- [ ] Add MongoDB connection using Mongoose
- [ ] Create models/Whitelist.js with schema (name, email, stellarWalletId, createdAt)
- [ ] Implement POST /api/whitelist endpoint with validation
- [ ] Add error handling for duplicate emails
- [ ] Create .env.example with MongoDB connection string

## Testing and Finalization
- [ ] Test frontend form submission
- [ ] Test backend API endpoint
- [ ] Ensure no breaking changes to existing UI/styles
- [x] Update TODO.md with completion status
