const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

// item model
const Item = require('../../models/Item')

// @route GET api/items
// @desc Get All Items
// @access Pbulic
router.get('/', (req, res) => {
  Item.find()
    .populate('user', ['name'])
    .sort({ date: -1 })
    .then(items => res.json(items))
})

// @route POST api/items
// @desc Create an item
// @access Private
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  })
  newItem.user = req.user.id

  newItem.save().then(item => res.json(item))
})

// @route DELETE api/items/:id
// @desc Delete an item
// @access Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      if (item.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User is not authorized' })
      }
      item.remove().then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router
