module.exports = {

  register: function(chip, ip) {
    if(!chip || !ip) return Promise.reject('whatever');

    return Modules
      .update({ chip: chip }, { ip: ip })
      .then(function(updated) {
        console.log(updated);
      });

  }

};
