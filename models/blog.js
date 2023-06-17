import { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  data: {
    type: String,
    required: [true, 'Blog is required.'],
  },
});

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;