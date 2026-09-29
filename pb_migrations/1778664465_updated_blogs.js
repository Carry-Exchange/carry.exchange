/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1063089307")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\""
  }, collection)

  // remove field
  collection.fields.removeById("number_post_id")

  // remove field
  collection.fields.removeById("file_cover")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number1267270444",
    "max": null,
    "min": null,
    "name": "post_id",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "file2366146245",
    "maxSelect": 1,
    "maxSize": 5242880,
    "mimeTypes": null,
    "name": "cover",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "bool_medium_001",
    "name": "medium",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1063089307")

  // update collection data
  unmarshal({
    "createRule": null,
    "updateRule": null
  }, collection)

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number_post_id",
    "max": null,
    "min": null,
    "name": "post_id",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "file_cover",
    "maxSelect": 1,
    "maxSize": 5242880,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif"
    ],
    "name": "cover",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  // remove field
  collection.fields.removeById("number1267270444")

  // remove field
  collection.fields.removeById("file2366146245")

  // remove field
  collection.fields.removeById("bool_medium_001")

  return app.save(collection)
})
