const presets = (bar, day) => {
  switch (bar) {
    case 'Continental':
      amounts = [
        {
          label: 'Caja',
          value: day?.amounts.find((amount) => amount.label === 'Caja')?.value,
        },
        {
          label: 'Desayunos',
          value: day?.amounts.find((amount) => amount.label === 'Desayunos')?.value,
        },
        {
          label: 'Comidas',
          value: day?.amounts.find((amount) => amount.label === 'Comidas')?.value,
        },
        {
          label: 'Meriendas',
          value: day?.amounts.find((amount) => amount.label === 'Meriendas')?.value,
        },
        {
          label: 'Efectivo',
          value: day?.amounts.find((amount) => amount.label === 'Efectivo')?.value,
        },
        {
          label: 'Tarjeta',
          value: day?.amounts.find((amount) => amount.label === 'Tarjeta')?.value,
        },
        {
          label: 'Carta',
          value: day?.amounts.find((amount) => amount.label === 'Carta')?.value,
        },
        {
          label: 'Carta pax',
          value: day?.amounts.find((amount) => amount.label === 'Carta pax')?.value,
        },
        {
          label: 'Menu',
          value: day?.amounts.find((amount) => amount.label === 'Menu')?.value,
        },
        {
          label: 'Menu pax',
          value: day?.amounts.find((amount) => amount.label === 'Menu pax')?.value,
        },
      ]
      break
    case 'Jauja':
      amounts = [
        {
          label: 'Caja',
          value: day?.amounts.find((amount) => amount.label === 'Caja')?.value,
        },
      ]
      break
    case 'Bro':
      amounts = [
        {
          label: 'Caja',
          value: day?.amounts.find((amount) => amount.label === 'Caja')?.value,
        },
        {
          label: 'Caja2',
          value: day?.amounts.find((amount) => amount.label === 'Caja2')?.value,
        },
      ]
      break
  }
  return amounts
}

module.exports = {
  presets
}