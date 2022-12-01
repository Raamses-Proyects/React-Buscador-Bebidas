const animacionStar = (e) => {
    e.target.classList.add('rotar')
    setTimeout(() => {
      e.target.classList.remove('rotar')
    }, 1200)
}

export default animacionStar