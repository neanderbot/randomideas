import IdeasApi from "../services/IdeasApi";
import IdeaList from "../components/IdeaList";

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (!this._form.elements.text.value || !this._form.elements.username.value || !this._form.elements.tag.value) {
      alert("Please enter all fields");
      return;
    }

    // Save user to localstorage

    localStorage.setItem("username", this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      username: this._form.elements.username.value,
      tag: this._form.elements.tag.value
    }

    // add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    // clear fields
    this._form.elements.text.value = "";
    this._form.elements.username.value = "";
    this._form.elements.tag.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));

    // add idea to UI
    this._ideaList.addIdeaToList(newIdea.data.data);
  }

  render() {
    let username = localStorage.getItem("username") || "";
    this._formModal.innerHTML = `
        <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" value="${username}" />
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>
        `;
    this._form = document.querySelector("#idea-form");
    this.addEventListeners();
  }
}

export default IdeaForm;