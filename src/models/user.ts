import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import TypeUser from './typeUser';

interface UserAttributes {
  idUser: number;
  email: string;
  name: string;
  password: string;
  idTypeUser: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'idUser'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public idUser!: number;
  public email!: string;
  public name!: string;
  public password!: string;
  public idTypeUser!: number;
  public typeUser?: TypeUser;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const userBuild = (sequelize: Sequelize) => {
  User.init(
    {
      idUser: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.UUID,
      },
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      idTypeUser: DataTypes.NUMBER,
    },
    {
      sequelize,
      tableName: 'user',
    },
  );
};

export const userAssociate = () => {
  User.belongsTo(TypeUser, {
    foreignKey: 'idTypeUser',
    as: 'typeUser',
  });
};

export default User;
