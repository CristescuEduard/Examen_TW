module.exports = (sequelize, DataTypes) => {
    const JobPostings = sequelize.define(
      "JobPostings",
      {
        Jobid:{
          type:DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        descriere:{
          type: DataTypes.STRING,
          allowNull:false,
          validate:{  
              len:[3,255]
          }
        },
        deadline: {
          type: DataTypes.DATE,
          allowNull: false,
          validate:{
              isDate:true,
              isAfter:"2022-02-12"
          }
        }

      },

      {
        freezeTableName: true,
        timestamps:false
      }
      
    );
    return JobPostings;
 };