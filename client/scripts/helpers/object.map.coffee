window.ObjectMap = (obj, map) ->
  keys = Object.keys(obj)
  keys.map (key) -> map(key, obj[key])