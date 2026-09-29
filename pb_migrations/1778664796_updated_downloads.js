/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_794313261")

  // remove field
  collection.fields.removeById("select_tags_001")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json_tags_002",
    "maxSize": 0,
    "name": "tags",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_794313261")

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

  // remove field
  collection.fields.removeById("json_tags_002")

  return app.save(collection)
})
