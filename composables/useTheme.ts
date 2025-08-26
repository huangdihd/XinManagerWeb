import { watch } from 'vue'

export const useTheme = () => {
    const theme = useState<string>('theme', () => 'dark')

    onMounted(() => {
        theme.value = localStorage.getItem('theme') ?? 'dark'
    })

    watch(theme, (v) => {
        if (import.meta.client) {
            localStorage.setItem('theme', v)
        }
    })

    return theme
}