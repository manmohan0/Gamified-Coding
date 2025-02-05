import { createClient } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { urls, dialogue } from '../utils/atoms'
import axios from 'axios'

// dotenvExpand.expand(dotenv.config())

const supaBase = createClient("https://hzovpwdbbcomzvqjnmwe.supabase.co", import.meta.env.VITE_STORAGE_ANON_KEY ?? "")

export const useData = () => {
    
    const [imageUrls, setImageUrls] = useRecoilState(urls)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [dialogues, setDialogues] = useRecoilState(dialogue)

    const images = async () => {
        const { data } = await supaBase.storage.from('Levels').list('Introduction', { sortBy: { column: "created_at", order: "asc" }})
        for (let i = 0; i < data.length; i++) {
            const imageName = data[i].name
            const imageUrl = supaBase.storage.from('Levels').getPublicUrl(`Introduction/${imageName}`)
            console.log(imageUrl)
            const image = imageUrl.data.publicUrl
            setImageUrls(prev => [...prev, image])
        }
    }

    const getDialogues = async () => {
        const  { data } = await axios.get("http://127.0.0.1:1010/dialogues")
        const dialogue = Object.values(data)
        dialogue.forEach((element) => {
            setDialogues((prev) => [...prev, element])
        });
    }
    
    useEffect(() => {
        getDialogues()
        images()
        console.log(imageUrls)
    }, [])

    return imageUrls
}