import importAllImages from '@/functions/importAllImages'

export default importAllImages(require.context('./images', false, /\.js/))
