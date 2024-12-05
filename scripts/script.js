document.querySelector('.button--light').addEventListener('click', () => {
    document.getElementById('container--stages').scrollIntoView()
})

document.addEventListener("DOMContentLoaded", () => {
    const persons = document.querySelectorAll(".person")
    const leftButton = document.querySelector("#last-person")
    const rightButton = document.querySelector("#next-person")
    const paginationInfo = document.querySelector(".pagination-info")

    let itemsPerPage = window.innerWidth < 581 ? 1 : 3
    let currentIndex = 0
    let autoSwitchInterval

    function updatePersons() {
        persons.forEach(person => {
            person.classList.remove("active")
        })

        if (currentIndex + itemsPerPage > persons.length) {
            currentIndex = 0
        }

        setTimeout(() => {
            for (let i = currentIndex; i < currentIndex + itemsPerPage; i++) {
                if (persons[i]) {
                    persons[i].classList.add("active")
                }
            }
        }, 250)

        paginationInfo.innerHTML = `
            ${Math.min(currentIndex + itemsPerPage, persons.length)} 
            <span class="persons-wrapper__pagination--opacity">/ ${persons.length}</span>
        `

        leftButton.disabled = currentIndex === 0
    }

    function resetAutoSwitch() {
        clearInterval(autoSwitchInterval)
        startAutoSwitch()
    }

    function startAutoSwitch() {
        autoSwitchInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % persons.length
            updatePersons()
        }, 4000)
    }

    leftButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + persons.length) % persons.length
        updatePersons()
        resetAutoSwitch()
    })

    rightButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % persons.length
        if (currentIndex + itemsPerPage > persons.length) {
            currentIndex = 0
        }
        updatePersons()
        resetAutoSwitch()
    })

    window.addEventListener("resize", () => {
        itemsPerPage = window.innerWidth < 581 ? 1 : 3
        updatePersons()
    })

    startAutoSwitch()
    updatePersons()
})

document.addEventListener("DOMContentLoaded", () => {
    const stages = document.querySelectorAll('.interactive-stage')
    const dots = document.querySelectorAll('.pagination-dots__dot')
    const prevButton = document.querySelector('#last-stage')
    const nextButton = document.querySelector('#next-stage')

    let currentIndex = 0

    function updateCarousel(index) {
        stages.forEach(stage => stage.classList.remove('active'))
        dots.forEach(dot => dot.classList.remove('active'))
        stages[index].classList.add('active')
        dots[index]?.classList.add('active')
        prevButton.disabled = index === 0
        nextButton.disabled = index === stages.length - 1
    }

    function nextSlide() {
        if (currentIndex < stages.length - 1) {
            currentIndex++
            updateCarousel(currentIndex)
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--
            updateCarousel(currentIndex)
        }
    }

    prevButton.addEventListener('click', () => {
        prevSlide()
    })

    nextButton.addEventListener('click', () => {
        nextSlide()
    })

    updateCarousel(currentIndex)
})

document.querySelectorAll('.button, .button--light, .mini-button, .medium-button')
    .forEach(button => {
    button.addEventListener('touchend', () => {
        button.style.pointerEvents = 'none'
        setTimeout(() => button.style.pointerEvents = '', 300)
    })
})
