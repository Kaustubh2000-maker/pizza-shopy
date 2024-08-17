import { react, useContext } from "react";

function EditPizzaForm({ editPizza, setEditPizza, handleUpdatePizza }) {
  return (
    <div className="account-pizza-edit-box">
      {editPizza && (
        <div className="account-pizza-edits">
          <form
            className="account-pizza-edits-form"
            onSubmit={handleUpdatePizza}
          >
            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-name"
                >
                  Name :
                </label>
              </div>
              <input
                className="account-pizza-edit-input"
                id="account-pizza-edit-name"
                type="text"
                value={editPizza.name}
                onChange={(e) =>
                  setEditPizza({ ...editPizza, name: e.target.value })
                }
                required
              />
            </div>
            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-photo"
                >
                  Photo :
                </label>
              </div>

              <input
                className="account-pizza-edit-input"
                id="account-pizza-edit-photo"
                type="text"
                value={editPizza.photo}
                onChange={(e) =>
                  setEditPizza({ ...editPizza, photo: e.target.value })
                }
                required
              />
            </div>
            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-summary"
                >
                  summary :
                </label>
              </div>

              <textarea
                className="account-pizza-edit-textarea"
                id="account-pizza-edit-summary"
                value={editPizza.summary}
                onChange={(e) =>
                  setEditPizza({ ...editPizza, summary: e.target.value })
                }
                required
              />
            </div>
            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-description"
                >
                  description :
                </label>
              </div>

              <textarea
                className="account-pizza-edit-textarea"
                id="account-pizza-edit-description"
                value={editPizza.description}
                onChange={(e) =>
                  setEditPizza({
                    ...editPizza,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-discovery-year"
                >
                  discovery year :
                </label>
              </div>

              <input
                className="account-pizza-edit-input"
                id="account-pizza-edit-discovery-year"
                type="text"
                value={editPizza.discovery_year}
                onChange={(e) =>
                  setEditPizza({
                    ...editPizza,
                    discovery_year: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-origin"
                >
                  Origin :
                </label>
              </div>

              <input
                className="account-pizza-edit-input"
                id="account-pizza-edit-origin"
                type="text"
                value={editPizza.country_of_origin}
                onChange={(e) =>
                  setEditPizza({
                    ...editPizza,
                    country_of_origin: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-totalRatings"
                >
                  total Ratings :
                </label>
              </div>

              <input
                className="account-pizza-edit-input"
                id="account-pizza-edit-totalRatings"
                type="text"
                value={editPizza.totalRatings}
                onChange={(e) =>
                  setEditPizza({
                    ...editPizza,
                    totalRatings: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-rating"
                >
                  Ratings :
                </label>
              </div>

              <input
                className="account-pizza-edit-input"
                id="account-pizza-edit-rating"
                type="text"
                step="0.1"
                value={editPizza.averageRatings}
                onChange={(e) =>
                  setEditPizza({
                    ...editPizza,
                    averageRatings: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-vegetarian"
                >
                  Vegetarian :
                </label>
              </div>
              <input
                className="account-pizza-edit-input"
                id="account-pizza-edit-vegetarian"
                type="checkbox"
                checked={editPizza.isVegetarian}
                onChange={(e) =>
                  setEditPizza({
                    ...editPizza,
                    isVegetarian: e.target.checked,
                  })
                }
              />
            </div>

            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-taste"
                >
                  taste :
                </label>
              </div>

              <input
                className="account-pizza-edit-input"
                id="account-pizza-edit-taste"
                type="text"
                value={editPizza.taste.join(", ")}
                onChange={(e) =>
                  setEditPizza({
                    ...editPizza,
                    taste: e.target.value.replace(/\s+/g, "").split(","),
                  })
                }
                required
              />
            </div>
            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-price"
                >
                  price :
                </label>
              </div>

              <input
                className="account-pizza-edit-input"
                id="account-pizza-edit-price"
                type="text"
                value={editPizza.price}
                onChange={(e) =>
                  setEditPizza({ ...editPizza, price: e.target.value })
                }
                required
              />
            </div>
            <div className="account-form-innerbox">
              <div className="account-label-div">
                <label
                  className="account-pizza-edit-form-label"
                  htmlFor="account-pizza-edit-size"
                >
                  sizes :
                </label>
              </div>

              <input
                className="account-pizza-edit-input"
                id="account-pizza-edit-size"
                type="text"
                value={editPizza.sizeOptions.join(", ")}
                onChange={(e) =>
                  setEditPizza({
                    ...editPizza,
                    sizeOptions: e.target.value.replace(/\s+/g, "").split(","),
                  })
                }
                required
              />
            </div>
            <div className="account-form-innerbox">
              <button className="account-pizza-edit-btn" type="submit">
                Update Pizza
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditPizzaForm;
