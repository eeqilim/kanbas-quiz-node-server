import model from "./model.js";

export const findAssignmentsByCourseId = (courseId) => model.find({ course: courseId });

export const getAssignmentById = (assignmentId) => model.findById(assignmentId);

export const createAssignment = (assignment) => {
    delete assignment._id;
    return model.create(assignment);
};

export const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });

export const updateAssignment = (assignmentId, updatedFields) => {
    return model.updateOne({ _id: assignmentId }, { $set: updatedFields });
};


export const createItem = async (assignmentId, newItem) => {
    delete newItem._id;
    const assignmentGroup = await model.findById(assignmentId);
    assignmentGroup.items.push(newItem);
    await assignmentGroup.save();
    return assignmentGroup.items[assignmentGroup.items.length - 1]._id;
};

export const deleteItem = async (assignmentId, itemId) => {
    return model.updateOne(
        { _id: assignmentId },
        { $pull: { items: { _id: itemId } } }
    );
};

export const updateItem = (assignmentId, itemId, updatedFields) => {
    return model.updateOne(
        { _id: assignmentId, "items._id": itemId },
        { $set: { "items.$": updatedFields } }
    );
};
