module.exports = (sequelize, DataTypes) => {
    const Candidates = sequelize.define(
        "Candidates",
        {
            Candidateid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nume: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [5, 255],
                },
            },
            cv: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [100, 255],
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
        },

        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Candidates;
};
