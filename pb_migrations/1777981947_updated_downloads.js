/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_794313261")

  // remove field
  collection.fields.removeById("text105650625")

  // remove field
  collection.fields.removeById("text3485858037")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select_tags_001",
    "maxSelect": 10,
    "name": "tags",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Market Research",
      "Trading Guide",
      "Risk Management",
      "DeFi Report",
      "Commodities Analysis",
      "Options Strategy",
      "Regulatory",
      "Case Study",
      "Research",
      "Analysis",
      "Commodity Perps",
      "Spot Markets",
      "Prediction Markets"
    ]
  }))

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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_794313261")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text105650625",
    "max": 0,
    "min": 0,
    "name": "category",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3485858037",
    "max": 0,
    "min": 0,
    "name": "gradient",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select_tags_001")

  // remove field
  collection.fields.removeById("text_image_url")

  return app.save(collection)
})
