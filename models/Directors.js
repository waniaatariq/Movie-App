
const mongoose = require('mongoose');
const DirectorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    }
});


export default mongoose.models.Director || mongoose.model('Director', DirectorSchema);