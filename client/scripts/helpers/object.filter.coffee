window.ObjectFilter = (obj, filter) ->
  keys = Object.keys(obj)
  results = {}
  keys.forEach (key) ->
    results[key] = obj[key] if filter(key, obj[key])
  results