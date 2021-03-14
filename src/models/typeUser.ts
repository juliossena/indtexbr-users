import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import User from './user';

interface TypeUserAttributes {
  idTypeUser: number;
  name: string;
}

interface TypeUserCreationAttributes extends Optional<TypeUserAttributes, 'idTypeUser'> {}

class TypeUser extends Model<TypeUserAttributes, TypeUserCreationAttributes> implements TypeUserAttributes {
  public idTypeUser!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const typeUserBuild = (sequelize: Sequelize) => {
  TypeUser.init(
    {
      idTypeUser: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'typeUser',
    },
  );
};

export const typeUserAssociate = () => {
  TypeUser.hasMany(User, {
    foreignKey: 'idUser',
    as: 'user',
  });
};

export default TypeUser;
