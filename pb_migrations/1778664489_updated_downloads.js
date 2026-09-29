/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_794313261")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\""
  }, collection)

  // remove field
  collection.fields.removeById("text_image_url")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "file_image_001",
    "maxSelect": 1,
    "maxSize": 10485760,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml"
    ],
    "name": "image",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "file_pdf_001",
    "maxSelect": 1,
    "maxSize": 52428800,
    "mimeTypes": [
      "application/pdf"
    ],
    "name": "file",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_794313261")

  // update collection data
  unmarshal({
    "createRule": null,
    "updateRule": null
  }, collection)

  // add field
  collection.fields.addAt(6, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "text_image_url",
    "name": "image",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // remove field
  collection.fields.removeById("file_image_001")

  // remove field
  collection.fields.removeById("file_pdf_001")

  return app.save(collection)
})
