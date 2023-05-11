const express = require('express');
const app = express();
app.use(require('./routes'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});