import React, { useEffect, useState } from 'react'
import Brightness1RoundedIcon from '@mui/icons-material/Brightness1Rounded'
import { Box } from '@mui/material'

export default function ChipTagsCircle({ selectedList }) {
  const [chipTagsActive, setToggleTagsActive] = useState(selectedList.length)

  useEffect(() => {
    setToggleTagsActive(selectedList.length)
  }, [selectedList])

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 40,
        bottom: 0,
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        justifyContent: 'center',
        fontSize: '13px',
      }}
    >
      +{chipTagsActive}
      <Brightness1RoundedIcon
        sx={{
          position: 'absolute',
          color: 'red',
          fontSize: '36px',
          color: '#e8e8e8',
          zIndex: -1,
        }}
      ></Brightness1RoundedIcon>
    </Box>
  )
}
