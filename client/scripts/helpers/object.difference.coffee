window.ObjectDifference = (a, b) ->
  ak = Object.keys a
  bk = Object.keys b

  keys = _.union ak, bk

  _.reduce(keys,
    (result, key) ->
      result[key] = b[key] if !a[key] or (b[key] and !_.isEqual a[key], b[key])
      result
    {}
  )