/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4180340331")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool_email_sent",
    "name": "email_sent_status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4180340331")

  // remove field
  collection.fields.removeById("bool_email_sent")

  return app.save(collection)
})
