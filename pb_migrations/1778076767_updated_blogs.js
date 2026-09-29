/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1063089307")

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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1063089307")

  // remove field
  collection.fields.removeById("number_post_id")

  // remove field
  collection.fields.removeById("file_cover")

  return app.save(collection)
})
