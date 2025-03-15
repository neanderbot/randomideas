import IdeasApi from "../services/IdeasApi";

class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector("#idea-list");
        this._allowedClasses = new Set();
        this.setAllowedClasses();
        this.getIdeas();
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener("reloadList", () => this.render());
    }

    setAllowedClasses() {
        this._allowedClasses.add("technology");
        this._allowedClasses.add("software");
        this._allowedClasses.add("business");
        this._allowedClasses.add("education");
        this._allowedClasses.add("health");
        this._allowedClasses.add("inventions");
    }

    getClassTag(tag) {
        let classTag = "";
        if (this._allowedClasses.has(tag.toLowerCase())) {
            classTag = `tag-${tag.toLowerCase()}`;
        }
        return classTag;

    }

    async getIdeas() {
        try {
            const res = await IdeasApi.getIdeas();
            this._ideas = res.data.data;
            this.render();
        } catch (error) {
            console.log(error);
        }
    }

    addIdeaToList(idea) {
        this._ideas.push(idea);
        this.render();
    }

    render() {
        this._ideaListEl.innerHTML = this._ideas.map((idea) => {
            let classTag = this.getClassTag(idea.tag);
            return `
                <div class="card">
                    <button class="delete"><i class="fas fa-times"></i></button>
                    <h3>
                        ${idea.text}
                    </h3>
                    <p class="tag ${classTag}">${idea.tag.toUpperCase()}</p>
                    <p>
                        Posted on <span class="date">${new Date(idea.date).toDateString()}</span> by
                        <span class="author">${idea.username}</span>
                    </p>
                </div>
            `;
        }).join('');

    }
}

export default IdeaList;