const MENU = [
  {id:'hamburger',name:'Hamburger',cat:'Burgers',price:3.60,desc:'Beef patty, lettuce, tomato, spread, and onion.',base:'#3 combo available',entree:true,comboNumber:'#3'},
  {id:'cheeseburger',name:'Cheeseburger',cat:'Burgers',price:4.10,desc:'Beef patty with a slice of American cheese.',base:'#2 combo available',entree:true,comboNumber:'#2'},
  {id:'double',name:'Double-Double',cat:'Burgers',price:5.90,desc:'Two beef patties and two slices of cheese.',base:'#1 combo available',entree:true,comboNumber:'#1'},
  {id:'triple',name:'3×3',cat:'Secret',price:8.10,desc:'Three patties stacked with three slices of cheese.',base:'Not-so-secret',entree:true},
  {id:'four',name:'4×4',cat:'Secret',price:10.20,desc:'Four patties and four slices of cheese.',base:'Not-so-secret',entree:true},
  {id:'dutchman',name:'Flying Dutchman',cat:'Secret',price:5.20,desc:'Two patties and two cheese slices. No bun or produce.',base:'Not-so-secret',entree:true},
  {id:'grilled-cheese',name:'Grilled Cheese',cat:'Secret',price:3.20,desc:'Two cheese slices, lettuce, tomato, spread, and onion.',base:'Meat-free',entree:true},
  {id:'veggie',name:'Veggie Sandwich',cat:'Secret',price:2.40,desc:'Burger bun with lettuce, tomato, onion, and spread; no patty.',base:'Meat-free',entree:true},
  {id:'protein',name:'Protein Style',cat:'Secret',price:4.10,desc:'Your burger wrapped in hand-leafed lettuce instead of a bun.',base:'Low-carb',entree:true},
  {id:'animal-burger',name:'Animal Style Burger',cat:'Secret',price:4.40,desc:'Mustard-cooked patty, pickles, extra spread, grilled onions.',base:'Fan favorite',entree:true},
  {id:'fries',name:'French Fries',cat:'Fries',price:2.30,desc:'Choose regular, light, well done, or extra well in the options.',base:'Classic'},
  {id:'animal-fries',name:'Animal Style Fries',cat:'Fries',price:4.70,desc:'Fries topped with cheese, spread, and grilled onions.',base:'Fan favorite'},
  {id:'cheese-fries',name:'Cheese Fries',cat:'Fries',price:3.50,desc:'Fresh-cut fries topped with melted cheese.',base:'Off-menu'},
  {id:'cola',name:'Soft Drink',cat:'Drinks',price:2.20,desc:'Coke, Diet Coke, 7UP, Dr Pepper, root beer, or lemonade.',base:'Drink'},
  {id:'shake',name:'Shake',cat:'Drinks',price:3.10,desc:'Chocolate, vanilla, strawberry—or blend the flavors.',base:'Hand-spun'},
  {id:'neapolitan',name:'Neapolitan Shake',cat:'Secret',price:3.10,desc:'Chocolate, vanilla, and strawberry together.',base:'Not-so-secret'},
  {id:'black-white',name:'Black & White Shake',cat:'Secret',price:3.10,desc:'Chocolate and vanilla shake blended together.',base:'Custom'},
  {id:'root-float',name:'Root Beer Float',cat:'Secret',price:3.10,desc:'Root beer topped with vanilla shake.',base:'Custom'},
  {id:'pink-lemonade',name:'Pink Lemonade',cat:'Drinks',price:2.20,desc:'In-N-Out’s signature tart pink lemonade.',base:'Drink'},
  {id:'milk',name:'Milk',cat:'Drinks',price:1.30,desc:'A cold carton of milk.',base:'Drink'}
];

const BURGER_OPTIONS = [
  {title:'Style',hint:'Choose one',type:'radio',name:'style',values:['Regular','Animal Style','Protein Style','Tomato Wrap','No Bun']},
  {title:'Onions',hint:'Choose any combination',type:'checkbox',name:'onion',values:['Raw Onion','Chopped Raw Onion','Grilled Onion','Whole Grilled Onion','No Onion']},
  {title:'Toppings & sauces',hint:'Choose as many as you like',type:'checkbox',name:'toppings',values:['Add Pickles','Add Chilies','Add Ketchup','Extra Spread','No Spread','No Tomato','No Lettuce']},
  {title:'Preparation',hint:'Optional',type:'checkbox',name:'prep',values:['Mustard Fried','Extra Toast','Cold Cheese','Cut in Half']}
];

const FRY_OPTIONS = [
  {title:'Fry cook',hint:'Choose one',type:'radio',name:'cook',values:['Regular','Light','Light Well','Well Done','Extra Well']},
  {title:'Fry toppings',hint:'Choose as many as you like',type:'checkbox',name:'fry-toppings',values:['Add Cheese','Animal Style','Add Chilies','Add Ketchup','No Salt','Spread on Side']}
];

const DRINK_OPTIONS = [
  {title:'Choice',hint:'Choose one',type:'radio',name:'drink',values:['Coke','Diet Coke','Coke Zero','7UP','Dr Pepper','Root Beer','Pink Lemonade','Light Lemonade','Iced Tea','Arnold Palmer']},
  {title:'Size',hint:'Choose one',type:'radio',name:'size',defaultValue:'Medium',values:['Small','Medium','Large','Extra Large']},
  {title:'Ice',hint:'Choose one',type:'radio',name:'ice',values:['Regular','No Ice','Light Ice','Extra Ice']},
  {title:'Drink extras',hint:'Optional',type:'checkbox',name:'drink-extras',values:['Add Lemon']}
];

const SHAKE_OPTIONS = [
  {title:'Flavor',hint:'Choose one',type:'radio',name:'flavor',values:['Vanilla','Chocolate','Strawberry','Neapolitan','Black & White','Chocolate Strawberry','Vanilla Strawberry']},
  {title:'Shake extras',hint:'Choose as many as you like',type:'checkbox',name:'shake-extras',values:['Extra Syrup','Light Syrup','Shake Float']}
];

const prefixedOptions = (prefix, label, sections) => sections.map(section => ({
  ...section,
  title:`${label} · ${section.title}`,
  name:`${prefix}-${section.name}`,
  mealDependent:true
}));

const ENTREE_ONLY = 'Entrée only';
const MEAL_ADD_ON = 4.50;
const MEAL_SIDE_OPTIONS = [
  ...prefixedOptions('meal-fries','Fries',FRY_OPTIONS),
  ...prefixedOptions('meal-drink','Drink',DRINK_OPTIONS)
];

const mealLabelFor = item => item.comboNumber ? `${item.comboNumber} Combo — fries + medium drink` : 'Add fries + medium drink';
const mealOptionsFor = item => [
  {title:'Make it a meal',hint:'Choose the entrée by itself or add fries and a drink.',type:'radio',name:'meal',values:[ENTREE_ONLY,mealLabelFor(item)]},
  ...MEAL_SIDE_OPTIONS
];

let state = JSON.parse(localStorage.getItem('out-about-order') || 'null') || {people:[],items:[],activePerson:null,dark:false};
let activeCategory = 'All';
let activeItem = null;
let editingUid = null;

const $ = selector => document.querySelector(selector);
const money = value => `$${value.toFixed(2)}`;
const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
const itemDetails = item => [...(item.options || []),item.notes].filter(Boolean);

function save(){
  localStorage.setItem('out-about-order',JSON.stringify(state));
}

function toast(message){
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'),1800);
}

function renderTabs(){
  const categories = ['All','Burgers','Fries','Drinks','Secret'];
  $('#tabs').innerHTML = categories.map(category => `<button class="tab ${category === activeCategory ? 'active' : ''}" data-cat="${category}">${category}${category === 'Secret' ? ' ✦' : ''}</button>`).join('');
}

function renderMenu(){
  const query = $('#searchInput').value.toLowerCase();
  const items = MENU.filter(item => (activeCategory === 'All' || item.cat === activeCategory) && `${item.name} ${item.desc} ${item.base}`.toLowerCase().includes(query));
  $('#menuGrid').innerHTML = items.length ? items.map(item => `<button class="menu-card" data-id="${item.id}"><span class="badge">${escapeHtml(item.base)}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.desc)}</p><strong>${money(item.price)} est.</strong><i>＋</i></button>`).join('') : '<p class="no-results">Nothing matched that search.</p>';
}

function addPerson(){
  const input = $('#personInput');
  const name = input.value.trim();
  if(!name) return;
  if(state.people.some(person => person.toLowerCase() === name.toLowerCase())) return toast('That name is already here');
  state.people.push(name);
  state.activePerson = name;
  input.value = '';
  save();
  renderOrder();
}

function renderOrder(){
  document.body.classList.toggle('dark',state.dark);
  $('#themeBtn').textContent = state.dark ? '☾' : '☀︎';
  $('#people').innerHTML = state.people.map(person => `<button class="person-chip ${person === state.activePerson ? 'active' : ''}" data-person="${escapeHtml(person)}">${escapeHtml(person)}</button>`).join('');

  const count = state.items.length;
  const total = state.items.reduce((sum,item) => sum + item.price,0);
  $('#itemCount').textContent = `${count} item${count === 1 ? '' : 's'}`;
  $('#dockCount').textContent = count;
  $('#dockTotal').textContent = money(total);
  $('#dockPerson').textContent = state.activePerson ? `Adding for ${state.activePerson}` : 'Add a name to get started';
  $('#emptyState').hidden = count > 0;

  const grouped = state.people.map(person => ({person,items:state.items.filter(item => item.person === person)})).filter(group => group.items.length);
  $('#orderList').innerHTML = grouped.map(group => `<div class="person-group"><h4>${escapeHtml(group.person)}</h4>${group.items.map(item => {
    const details = itemDetails(item).map(escapeHtml).join(' · ') || 'As is';
    return `<div class="order-item"><button class="item-edit" data-edit="${item.uid}" aria-label="Edit ${escapeHtml(item.name)}"><span><strong>${escapeHtml(item.name)} · ${money(item.price)}</strong><small>${details}</small></span><em>EDIT</em></button><button class="item-remove" data-remove="${item.uid}" aria-label="Remove ${escapeHtml(item.name)}">×</button></div>`;
  }).join('')}</div>`).join('');
  $('#subtotal').textContent = money(total);
}

function optionsFor(item){
  if(item.cat === 'Fries') return FRY_OPTIONS;
  if(item.id.includes('shake') || ['neapolitan','black-white'].includes(item.id)) return SHAKE_OPTIONS;
  if(item.cat === 'Drinks') return DRINK_OPTIONS;
  if(item.entree) return [...BURGER_OPTIONS,...mealOptionsFor(item)];
  return [];
}

function renderOptions(item,savedItem){
  const savedMeal = savedItem?.selections?.meal || [];
  const mealSelected = savedMeal.some(value => value !== ENTREE_ONLY);
  return optionsFor(item).map(section => {
    const savedValues = savedItem?.selections?.[section.name] || savedItem?.options || [];
    const sectionHasSavedValue = section.values.some(value => savedValues.includes(value));
    const disabled = section.mealDependent && !mealSelected;
    const choices = section.values.map((value,index) => {
      const isDefault = section.defaultValue ? value === section.defaultValue : index === 0;
      const checked = savedValues.includes(value) || (section.type === 'radio' && !sectionHasSavedValue && isDefault);
      return `<label class="choice"><input type="${section.type}" name="${section.name}" value="${escapeHtml(value)}" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}><span>${escapeHtml(value)}</span></label>`;
    }).join('');
    return `<fieldset class="custom-section ${section.mealDependent && !mealSelected ? 'meal-dependent is-hidden' : section.mealDependent ? 'meal-dependent' : ''}"><legend>${escapeHtml(section.title)}</legend><p>${escapeHtml(section.hint)}</p><div class="choices">${choices}</div></fieldset>`;
  }).join('');
}

function isMealSelected(){
  const selected = document.querySelector('[name="meal"]:checked');
  return Boolean(activeItem?.entree && selected && selected.value !== ENTREE_ONLY);
}

function refreshMealOptions(){
  const mealSelected = isMealSelected();
  document.querySelectorAll('.meal-dependent').forEach(section => {
    section.classList.toggle('is-hidden',!mealSelected);
    section.querySelectorAll('input').forEach(input => {input.disabled = !mealSelected;});
  });
  $('#dialogPrice').textContent = `${money(activeItem.price + (mealSelected ? MEAL_ADD_ON : 0))} estimated`;
}

function openItem(id,uid = null){
  const savedItem = uid === null ? null : state.items.find(item => String(item.uid) === String(uid));
  if(!savedItem && !state.activePerson){
    $('#personInput').focus();
    return toast('Add or select a person first');
  }

  activeItem = MENU.find(item => item.id === id);
  if(!activeItem) return toast('That menu item is no longer available');
  editingUid = savedItem ? savedItem.uid : null;
  $('#dialogTitle').textContent = activeItem.name;
  $('#dialogDesc').textContent = activeItem.desc;
  $('#dialogPrice').textContent = `${money(activeItem.price)} estimated`;
  $('#itemNotes').value = savedItem?.notes || '';
  $('#customSections').innerHTML = renderOptions(activeItem,savedItem);
  $('#saveItemBtn').textContent = savedItem ? 'SAVE CHANGES' : 'ADD ITEM';
  refreshMealOptions();
  $('#itemDialog').showModal();
}

function readSelections(){
  const selections = {};
  const options = [];
  const mealSelected = isMealSelected();
  for(const section of optionsFor(activeItem)){
    if(section.mealDependent && !mealSelected) continue;
    const selected = [...document.querySelectorAll(`[name="${section.name}"]:checked`)].map(input => input.value);
    selections[section.name] = selected;
    const visibleValues = section.name === 'meal' ? [] : selected.filter(value => value !== 'Regular' && value !== ENTREE_ONLY);
    options.push(...visibleValues.map(value => section.mealDependent ? `${section.title}: ${value}` : value));
  }
  return {selections,options,mealSelected};
}

function saveItem(){
  const {selections,options,mealSelected} = readSelections();
  const notes = $('#itemNotes').value.trim();
  const price = activeItem.price + (mealSelected ? MEAL_ADD_ON : 0);
  const cartName = mealSelected ? (activeItem.comboNumber ? `${activeItem.comboNumber} ${activeItem.name} Combo` : `${activeItem.name} Meal`) : activeItem.name;
  if(editingUid !== null){
    const index = state.items.findIndex(item => String(item.uid) === String(editingUid));
    if(index !== -1){
      const previous = state.items[index];
      state.items[index] = {...previous,id:activeItem.id,name:cartName,price,options,selections,notes};
      toast(`${cartName} updated`);
    }
  }else{
    state.items.push({uid:Date.now(),person:state.activePerson,id:activeItem.id,name:cartName,price,options,selections,notes});
    toast(`${cartName} added for ${state.activePerson}`);
  }
  save();
  renderOrder();
  $('#itemDialog').close();
}

function orderText(){
  return state.people.map(person => {
    const items = state.items.filter(item => item.person === person);
    if(!items.length) return '';
    return `${person.toUpperCase()}\n${items.map(item => {
      const details = itemDetails(item);
      return `• ${item.name}${details.length ? ` — ${details.join(', ')}` : ''}`;
    }).join('\n')}`;
  }).filter(Boolean).join('\n\n') + `\n\nESTIMATED SUBTOTAL: ${money(state.items.reduce((sum,item) => sum + item.price,0))}\nPrices vary by location.`;
}

function review(){
  if(!state.items.length) return toast('Add something to the order first');
  $('#reviewContent').innerHTML = state.people.map(person => {
    const items = state.items.filter(item => item.person === person);
    if(!items.length) return '';
    return `<section class="review-person"><h3>${escapeHtml(person)}</h3>${items.map(item => `<div class="review-line"><span><b>${escapeHtml(item.name)}</b><small>${itemDetails(item).map(escapeHtml).join(' · ') || 'As is'}</small></span><b>${money(item.price)}</b></div>`).join('')}</section>`;
  }).join('') + `<div class="review-total"><span>Estimated subtotal</span><span>${money(state.items.reduce((sum,item) => sum + item.price,0))}</span></div>`;
  $('#reviewDialog').showModal();
}

$('#tabs').addEventListener('click',event => {
  const button = event.target.closest('[data-cat]');
  if(!button) return;
  activeCategory = button.dataset.cat;
  renderTabs();
  renderMenu();
});

$('#menuGrid').addEventListener('click',event => {
  const button = event.target.closest('[data-id]');
  if(button) openItem(button.dataset.id);
});

$('#searchInput').addEventListener('input',renderMenu);
$('#addPersonBtn').onclick = addPerson;
$('#personInput').addEventListener('keydown',event => {if(event.key === 'Enter') addPerson();});
$('#people').addEventListener('click',event => {
  const button = event.target.closest('[data-person]');
  if(!button) return;
  state.activePerson = button.dataset.person;
  save();
  renderOrder();
});

$('#orderList').addEventListener('click',event => {
  const removeButton = event.target.closest('[data-remove]');
  if(removeButton){
    state.items = state.items.filter(item => String(item.uid) !== removeButton.dataset.remove);
    save();
    renderOrder();
    return;
  }
  const editButton = event.target.closest('[data-edit]');
  if(editButton){
    const item = state.items.find(candidate => String(candidate.uid) === editButton.dataset.edit);
    if(item) openItem(item.id,item.uid);
  }
});

$('#customSections').addEventListener('change',event => {
  const input = event.target;
  if(input.name === 'meal') refreshMealOptions();
  if(!input.checked || !input.name.includes('onion')) return;
  if(input.value === 'No Onion'){
    document.querySelectorAll(`[name="${input.name}"]`).forEach(option => {if(option !== input) option.checked = false;});
    return;
  }
  const noOnion = document.querySelector(`[name="${input.name}"][value="No Onion"]`);
  if(noOnion) noOnion.checked = false;
});

$('#itemForm').addEventListener('submit',event => {
  event.preventDefault();
  saveItem();
});
$('#itemDialogClose').onclick = () => $('#itemDialog').close();
$('#itemDialog').addEventListener('close',() => {editingUid = null;});
$('#reviewBtn').onclick = review;
$('#reviewClose').onclick = () => $('#reviewDialog').close();
$('#copyBtn').onclick = async () => {await navigator.clipboard.writeText(orderText());toast('Order copied to clipboard');};
$('#printBtn').onclick = () => window.print();
$('#themeBtn').onclick = () => {state.dark = !state.dark;save();renderOrder();};
$('#newOrderBtn').onclick = () => {
  if(state.items.length && !confirm('Start over and clear the current order?')) return;
  state.people = [];
  state.items = [];
  state.activePerson = null;
  save();
  renderOrder();
};
$('#clearBtn').onclick = () => {state.people = [];state.items = [];state.activePerson = null;save();renderOrder();toast('Saved order cleared');};
$('#howBtn').onclick = () => {document.querySelector('#builder')?.scrollIntoView();setTimeout(() => $('#personInput').focus(),500);};

const toggleOrder = open => {$('#orderPanel').classList.toggle('open',open);$('#scrim').classList.toggle('open',open);};
$('#openOrderBtn').onclick = () => toggleOrder(true);
$('#closeOrderBtn').onclick = () => toggleOrder(false);
$('#scrim').onclick = () => toggleOrder(false);

renderTabs();
renderMenu();
renderOrder();
