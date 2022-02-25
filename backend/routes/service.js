const { Router } = require('express');

const User = require('../models/User');

const router = Router();

router.post('', (req, res) => {
    const { name } = req.body;
    const user = req.user;

    if (!user) {
        res.status(401).send('Not logged in');
    } else {
        User.findOne({ username: user.username })
        .then(user => {
            user.services.push({name: name, widgets: []});
            user.save()
            res.send(user);
        })
    }
})

router.get('/:serviceId/:widgetId', (req, res) => {
    const { serviceId, widgetId } = req.params;
    const user = req.user;

    if (!user) {
        res.status(401).send('Not logged in');
    } else {
        User.findOne({ username: user.username })
        .then(user => {
            const service = user.services.id(serviceId);
            const widget = service.widgets.id(widgetId);
            res.send(widget);
        })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const user = req.user;

    if (!user) {
        res.status(401).send('Not logged in');
    } else {
        User.findOne({ username: user.username })
        .then(user => {
            user.services = user.services.filter(service => !service._id.equals(id));
            user.save()
            res.send(user);
        })
    }
})

router.post('/widget', (req, res) => {
    const { widget, serviceId } = req.body;
    const user = req.user;

    if (!user) {
        res.status(401).send('Not logged in');
    } else {
        User.findOne({ username: user.username })
        .then(user => {
            user.services.id(serviceId).widgets.push(widget);
            user.save()
            res.send(user);
        })
    }
})

router.delete('/:serviceId/:widgetId', (req, res) => {
    const serviceId = req.params.serviceId;
    const widgetId = req.params.widgetId;
    const user = req.user;

    if (!user) {
        res.status(401).send('Not logged in');
    } else {
        User.findOne({ username: user.username })
        .then(user => {
            user.services.id(serviceId).widgets = user.services.id(serviceId).widgets.filter(widget => !widget._id.equals(widgetId));
            user.save()
            res.send(user);
        })
    }
})

router.put('/:serviceId/:widgetId', (req, res) => {
    const { serviceId, widgetId } = req.params;
    const widget = req.body;
    const user = req.user;

    if (!user) {
        res.status(401).send('Not logged in');
    } else {
        User.findOne({ username: user.username })
        .then(user => {
            const service = user.services.id(serviceId);
            var cWidget = service.widgets.id(widgetId)
            cWidget.refreshRate = widget.refreshRate;
            cWidget.size = widget.size;
            cWidget.options = widget.options;
            user.save()
            res.send(user);
        })


    }
})

module.exports = router;