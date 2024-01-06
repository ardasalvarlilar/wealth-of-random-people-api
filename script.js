const main = document.getElementById('main')
const add_user_btn = document.getElementById('add-user')
const double_btn = document.getElementById('double')
const show_millionaires_btn = document.getElementById('show-millionaires')
const sort_btn = document.getElementById('sort')
const calculate_wealth_btn = document.getElementById('calculate-wealth')

let data = []
// fetch random user and add money
get_ramdom_user()
get_ramdom_user()
get_ramdom_user()
async function get_ramdom_user(){
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()
  const user = data.results[0]
  const new_user = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  add_data(new_user)
}

// double moneys
function double_money(){
  data = data.map(user => {
    return { ...user,money: user.money * 2 }
  })

  update_dom()
}

// sort users by richest
function sort_by_richest(){
  data.sort((a,b) => b.money - a.money)
  update_dom()
}

// filter only millionaires
function show_millionaires(){
  data = data.filter(user =>  user.money > 1000000)
  update_dom()
}

// calculate the total wealth
function calculate_wealth(){
  const wealth = data.reduce((acc,user) => acc + user.money,0)
  const wealth_el = document.createElement('div')
  wealth_el.innerHTML = `<h3>total wealth: <strong>${format_money(wealth)}</strong></h3>`
  main.appendChild(wealth_el)
}

// add new obj to data arr
function add_data(obj){
  data.push(obj)

  update_dom()
}

// update dom
function update_dom(provided_data = data){
  // clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
  provided_data.forEach(item => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${format_money(item.money)}`
    main.appendChild(element)
  })
}

// format number as money
function format_money(number){
  return'$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listener
add_user_btn.addEventListener('click',get_ramdom_user)
double_btn.addEventListener('click', double_money)
sort_btn.addEventListener('click',sort_by_richest)
show_millionaires_btn.addEventListener('click',show_millionaires)
calculate_wealth_btn.addEventListener('click',calculate_wealth)