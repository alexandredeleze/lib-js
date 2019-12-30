
const utils = require('./utils.js');

/**
 * @class Service
 * Holds Pryv Service informations
 *
 *
 * @property {TokenAndEndpoint} tokenAndApi
 * @memberof Pryv
 * 
 * @constructor
 * @this {Service} 
 * @param {string} pryvServiceInfoUrl Url point to /service/info of a Pryv platform: https://api.pryv.com/reference/#service-info
 */
class Service {

  constructor(pryvServiceInfoUrl) {
    this._pryvServiceInfoUrl = pryvServiceInfoUrl;
    this._pryvServiceInfo = null;
  }

  /**
   * Return service info parameters info known of fetch it if needed.
   * @param {boolean?} forceFetch If true, will force fetching service info.
   * @returns {Promise<PryvServiceInfo>} Promise to Service info Object
   */
  info(forceFetch) {
    return new Promise(async (resolve, reject) => {
      if (!forceFetch && this._pryvServiceInfo) {
        resolve(this._pryvServiceInfo);
      } else { 
        const res = await utils.superagent.get(this._pryvServiceInfoUrl).set('accept', 'json');
        this._pryvServiceInfo = res.body;
        resolve(this._pryvServiceInfo);
      }
    });
  }
}

module.exports = Service;

/**
 * Object to handle Pryv Service Informations https://api.pryv.com/reference/#service-info
 * @typedef {Object} PryvServiceInfo
 * @property {string} register The URL of the register service.
 * @property {string} access The URL of the access page.
 * @property {string} api The API endpoint format.
 * @property {string} name The platform name.
 * @property {string} home The URL of the platform's home page.
 * @property {string} support The email or URL of the support page.
 * @property {string} terms The terms and conditions, in plain text or the URL displaying them.
 * @property {string} eventTypes The URL of the list of validated event types.
 */