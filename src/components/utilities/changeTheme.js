const changeTheme = (currentTheme, dispatch) => {
  if (currentTheme === 'dark-ui-items') {
    dispatch({
      type: 'CHANGE_THEME',
      theme: 'light-ui-items',
    })
  } else {
    dispatch({
      type: 'CHANGE_THEME',
      theme: 'dark-ui-items',
    })
  }
}

export default changeTheme
