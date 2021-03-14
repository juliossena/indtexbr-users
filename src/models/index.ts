import { Sequelize } from 'sequelize';
import { userBuild, userAssociate } from './user';
import { typeUserBuild, typeUserAssociate } from './typeUser';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';

config[env].logging = false;
config[env].operatorsAliases = null;
const sequelize = new Sequelize(config[env]);

userBuild(sequelize);
typeUserBuild(sequelize);

userAssociate();
typeUserAssociate();

export default sequelize;
