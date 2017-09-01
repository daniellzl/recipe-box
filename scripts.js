/*
make ReactBootstrap labels work in browser
https://stackoverflow.com/questions/33012499/react-bootstrap-fails-to-render
*/
const Button = ReactBootstrap.Button;
const Modal = ReactBootstrap.Modal;
const Accordion = ReactBootstrap.Accordion;
const Panel = ReactBootstrap.Panel;
const ListGroup = ReactBootstrap.ListGroup;
const ListGroupItem = ReactBootstrap.ListGroupItem;
const Jumbotron = ReactBootstrap.Jumbotron;

/*
████████ ██ ████████ ██      ███████
   ██    ██    ██    ██      ██
   ██    ██    ██    ██      █████
   ██    ██    ██    ██      ██
   ██    ██    ██    ███████ ███████
*/

const Title = (props) => {
	// header title for page

    return (
        <Jumbotron>
            <h1>
                <strong>Recipe Box</strong>
            </h1>
            <br/>
            <p>View, Add, and Edit your Favorite Cooking Recipes</p>
        </Jumbotron>
    );
}

/*
 █████  ██████  ██████  ██████  ███████  ██████ ██ ██████  ███████
██   ██ ██   ██ ██   ██ ██   ██ ██      ██      ██ ██   ██ ██
███████ ██   ██ ██   ██ ██████  █████   ██      ██ ██████  █████
██   ██ ██   ██ ██   ██ ██   ██ ██      ██      ██ ██      ██
██   ██ ██████  ██████  ██   ██ ███████  ██████ ██ ██      ███████
*/

class AddRecipe extends React.Component {
	// button and form for adding recipes

    constructor(props) {
        super(props);
        this.state = {
            recipeName: "",
            ingredients: "",
            showModal: false
        };
    }

    close() {
		// close add recipe form and update complete recipes list

        this.setState({showModal: false});
        this.props.addNewRecipe(this.state.recipeName, this.state.ingredients);
    }

    open() {
		// open add recipe form

        this.setState({showModal: true});
    }

    render() {

		/*
        React and value attribute in input
        https://stackoverflow.com/questions/34006333/cant-type-in-react-input-text-field
		*/
        return (
            <div>
                <Button
					bsStyle="info"
					bsSize="large"
					onClick={() => this.open()}
				>
                    Add Recipe
                </Button>
                <Modal
					show={this.state.showModal} onHide={this.close.bind(this)}
				>
                    <Modal.Body>
                        <div>
                            <h2>Recipe</h2>
                            <input
								type="text"
								name="recipeName"
								placeholder="Recipe Name"
								onChange={(event) => this.setState({recipeName: event.target.value})}
							/>
                        </div>
                        <div>
                            <h2>Ingredients</h2>
                            <textarea
								name="ingredients"
								rows="10"
								cols="57"
								placeholder="Ingredients separated by commas (ex. Apples, Oranges, Bananas)" onChange={(event) => this.setState({ingredients: event.target.value})}
							/>
                        </div>
                        <Button
							bsStyle="info"
							onClick={() => this.close()}
						>
							Add Recipe
						</Button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

/*
██ ███    ██  ██████  ██████  ███████ ██████  ██      ██ ███████ ████████
██ ████   ██ ██       ██   ██ ██      ██   ██ ██      ██ ██         ██
██ ██ ██  ██ ██   ███ ██████  █████   ██   ██ ██      ██ ███████    ██
██ ██  ██ ██ ██    ██ ██   ██ ██      ██   ██ ██      ██      ██    ██
██ ██   ████  ██████  ██   ██ ███████ ██████  ███████ ██ ███████    ██
*/

const IngredientList = (props) => {
	// convert an ingredients string into a ReactBootstrap list

	// turn ingredients string into array
    const ingredientArr = props.ingredients.split(",");

	// place each ingredient into its on row
    const ingredients = ingredientArr.map((ingredient) => {
        return (
            <ListGroupItem>
                {ingredient.trim()}
            </ListGroupItem>
        );
    });

    return (
        <ListGroup>
            {ingredients}
        </ListGroup>
    );
}

/*
██████  ███████  ██████ ██ ██████  ███████ ██      ██ ███████ ████████
██   ██ ██      ██      ██ ██   ██ ██      ██      ██ ██         ██
██████  █████   ██      ██ ██████  █████   ██      ██ ███████    ██
██   ██ ██      ██      ██ ██      ██      ██      ██      ██    ██
██   ██ ███████  ██████ ██ ██      ███████ ███████ ██ ███████    ██
*/

class RecipeList extends React.Component {
	// display recipes as a list with ability to edit and delete recipe entries

    constructor(props) {
        super(props);
        this.state = {
            recipeName: "",
            ingredients: "",
            open: false
        };
    }


    open(recipeName) {
	// opens given recipe edit form

        this.setState({
            open: !this.state.open,
            recipeName: recipeName,
            ingredients: this.props.recipes[recipeName]
        });
    }

    edit() {
	// saves recipe edit

        this.setState({open: false});
        this.props.editRecipe(this.state.recipeName, this.state.ingredients);
    }

    delete(recipeName) {
		// deletes given recipe

        this.props.deleteRecipe(recipeName);
        this.setState({open: false});
    }

    render() {

		// create recipe dropdown for a given recipe
		/*
        iterate over object in JSX
        https://stackoverflow.com/questions/29534224/react-jsx-iterating-through-a-hash-and-returning-jsx-elements-for-each-key
		*/
        const recipeList = Object.keys(this.props.recipes).map((recipeName, index) => {
            return (
                <Panel
					header={recipeName}
					eventKey={index}
				>
                    <IngredientList
						ingredients={this.props.recipes[recipeName]}
					/>
                    <Button
						onClick={() => this.delete(recipeName)} bsStyle="danger"
					>
						Delete
					</Button>
                    <Button
						onClick={() => this.open(recipeName)} bsStyle="info"
					>
						Edit
					</Button>
                    <Panel
						collapsible expanded={this.state.open}>
                        <div>
                            <p>Ingredients</p>
                            <textarea
								name="ingredients"
								rows="10"
								cols="67" defaultValue={this.props.recipes[recipeName]}
								onChange={(event) => this.setState({ingredients: event.target.value})}
							/>
                        </div>
                        <Button
							bsStyle="info"
							onClick={() => this.edit()}
						>
							Save Edit
						</Button>
                    </Panel>
                </Panel>
            );
        });

        return (
            <div>
                <Accordion>
                    {recipeList}
                </Accordion>
            </div>
        );
    }
}

/*
 █████  ██████  ██████
██   ██ ██   ██ ██   ██
███████ ██████  ██████
██   ██ ██      ██
██   ██ ██      ██
*/

class App extends React.Component {
	// main application

    constructor(props) {
        super(props);
        this.state = this.getRecipes();
		this.addNewRecipe = this.addNewRecipe.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
		this.editRecipe = this.editRecipe.bind(this);
    }

	getRecipes() {
		// gets recipes from local storage if it exists, otherwise returns generic recipes

		const recipes = (localStorage._recipes)
            ? {
                recipes: JSON.parse(localStorage._recipes)
            }
            : {
                recipes: {
                    "Shrimp Francesca": "Shrimp, Artichoke Hearts, Bread Crumbs, Parsley, Lemon, Butter, Garlic, Romano Cheese",
                    "Chicken Milano": "Butter, Garlic, Sun-Dried Tomatoes, Chicken Broth, Cream, Chicken Breast, Salt, Pepper, Vegetable Oil, Basil, Fettucini Pasta",
                    "Insalata Caprese": "Tomatoes, Mozzarella Cheese, Leaves, Extra Virgin Olive Oil, Sea Salt, Black Pepper"
                }
            };

		return recipes;
	}

    addNewRecipe(recipeName, ingredients) {
		// given a new recipe name and list of ingredients, add new recipe to recipes
		/*
        store object to state
        https://stackoverflow.com/questions/27105257/storing-an-object-in-state-of-a-react-component)
		*/
		/*
        store to local storage
        https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
		*/

		// if recipe name isn't empty
        if (recipeName !== "") {

			// add recipe name and ingredient to recipes
            let recipes = this.state.recipes;
            recipes[recipeName] = ingredients;
            this.setState({recipes: recipes});

			// save recipes to local storage
            localStorage._recipes = JSON.stringify(recipes);
        }
    }

    deleteRecipe(recipeName) {
		// delete given recipe from recipes

		// delete given recipe
        let recipes = this.state.recipes;
        delete recipes[recipeName];
        this.setState({recipes: recipes});

		// save recipes to local storage
        localStorage._recipes = JSON.stringify(recipes);
    }

    editRecipe(recipeName, ingredients) {
		// given a existing recipe name and a modified list of ingredients, edit existing recipe's ingredients

		// edit given recipe
        let recipes = this.state.recipes;
        recipes[recipeName] = ingredients;
        this.setState({recipes: recipes});

		// save recipes to local storage
        localStorage._recipes = JSON.stringify(recipes);
    }

    render() {
        return (
            <div className="container">
                <Title />
                <RecipeList
					recipes={this.state.recipes}
					deleteRecipe={this.deleteRecipe}
					editRecipe={this.editRecipe}
				/>
                <AddRecipe
					addNewRecipe={this.addNewRecipe}
				/>
            </div>
        );
    }
}

// render application to DOM
ReactDOM.render( <App/>, document.querySelector("#App"));
