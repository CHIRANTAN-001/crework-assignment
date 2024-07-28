import { model, Schema } from "mongoose"

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        status: {
            type: String,
            required: true,
            enum: ['To do', 'In progress', 'Under review', 'Finished']
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'Urgent']
        },
        deadline: {
            type: Date
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    },
    {
        timestamps: true
    }
)

export const Task = model('Task', taskSchema)