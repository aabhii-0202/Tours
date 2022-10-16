/* eslint-disable*/
import { Dimensions, useWindowDimensions } from 'react-native'

export const FontSizes = {
    t1:55,
    t2:48,
    t3:42,
    t4:33,
    t5:24,
    t6:28,

    h:22,
    h0:19,
    h1:18,
    h2:17,
    h3:16,
    h4:15,

    p1:14,
    p2:13,
    p3:12,

}

export const Colors = {
    primary1: '#68bd87',
    primary2: '68bd87',
    primary3: '#84C99D',
    primary4: '#92CFA8',
    primary5: '#D6EDDE',

    grey8C: '#8C9099',
    
    
    border2:'#538866',
    border:'#5F9C75',
    background: '#FCFCFD',
    white: '#ffffff',
    txtBlack: '#343434',
    link: '#0D67A8',
    disabled: '#D1C9CC',
}

export const Screen = {
    height : Dimensions.get('window').height,
    width : Dimensions.get('window').width
}
