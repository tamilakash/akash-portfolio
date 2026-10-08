import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['programming', 'webTech', 'coreConcepts', 'softSkills'], 
    required: true 
  },
  level: { type: Number, default: 80 },
  icon: { type: String, default: 'fa-solid fa-code' },
  color: { type: String, default: '#00f2fe' }
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
