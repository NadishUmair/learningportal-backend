const subjectModel = require("../../models/CurriculumModel/subject");
const gradeModel = require("../../models/Grade/grade.models");
const { findOne } = require("../../models/StudentModel/student");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");


exports.AddSubject = asyncHandler(async(req, res) => {
    const { subjectname } = req.body;
    const gradeId = req.params.id;
    try {
        const grade = await gradeModel.findById(gradeId).populate('gradeSubjects' );

        if (!grade) {
            throw new Error("Grade not found");
        }
      const subjectIds = grade.gradeSubjects.map(subject => subject._id);
const subjectData = [];
for (const subjectId of subjectIds) {
    const subject = await subjectModel.findById(subjectId);
    if (subject) {
        subjectData.push(subject);
    }
}
const subjectNames = subjectData.map(subject => subject.subjectname);
await Promise.all(subjectNames.map(async (item) => {
    if (item === subjectname) {
        throw new Error("Subject with this name already exists in this grade");
    }
}));
        const newSubject = await new subjectModel({ subjectname, gradeId }).save();
        grade.gradeSubjects.push(newSubject);
        await grade.save();
        res.status(200).json({
            message: "Subject created",
            Subjectsave: newSubject
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


exports.deleteSubject=asyncHandler(async(req,res)=>{
    const subjectId=req.params.id;
    try {
          const findsubject=await subjectModel.findById(subjectId);
          if(!findsubject){
            return new ApiResponse(
                .200,
                {},
                "Subject not found"
            )
          }
    } catch (error) {
        const errorMessage=error.message || "something went wrong";
        return res.status(error.status || 500).json(new ApiResponse(error.status || 500,errorMessage))
        
    }
})