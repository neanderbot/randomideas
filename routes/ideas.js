const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// get all ideas
router.get("/", async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({ success: true, count: ideas.length, data: ideas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "success": false, "data": null, "error": "Undefined error when searching the database" })

    }
});


// get single idea
router.get("/:id", async (req, res) => {

    try {
        const idea = await Idea.findById(req.params.id);
        res.json({ success: true, data: idea });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: null, error: "Something went wrong" });
    }
});

// add an idea
router.post("/", async (req, res) => {
    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
    })

    try {
        const savedIdea = await idea.save();
        res.json({ success: true, data: savedIdea });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: null, error: "Something went wrong" });
    }



});

// update data
router.put("/:id", async (req, res) => {
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    text: req.body.text,
                    tag: req.body.tag
                }
            },
            {
                new: true
            }
        );
        res.json({ success: true, data: updatedIdea })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: null, error: "Something went wrong" });
    }
});



// delete data

router.delete("/:id", async (req, res) => {
    console.log(`the id is ${req.params.id}`)
    try {
        const foundIdea = await Idea.findByIdAndDelete(req.params.id);
        res.json({ success: true, data: {} });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: null, error: "Something went wrong" });
    }









    // const id = +req.body.id || null;
    // console.log(id);
    // console.log(typeof id);
    // if (id) {
    //     // get index. Account for cases with different indexes and same id
    //     const indexes = [];
    //     for (let index in ideas) {
    //         if (ideas[index].id === id) {
    //             indexes.push(index);
    //         }
    //     }

    //     if (indexes.length > 0) {
    //         indexes.forEach(index => ideas.splice(index, 1));
    //         res.status(200);
    //         return res.json({ "success": true, "data": indexes });
    //     }

    // }
    // return res.json({ "success": false, "count": ideas.length, "data": null, "error": `No idea found with id ${id}` });

});

module.exports = router;