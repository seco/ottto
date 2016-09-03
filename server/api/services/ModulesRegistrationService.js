module.exports = {

  register: function(chip, ip) {
    if(!chip) return Promise.reject('No Chip ID!');
    if(!ip) return Promise.reject('No IP Address!');

    return Modules.update({ chip: chip }, { ip: ip });
  }

};
