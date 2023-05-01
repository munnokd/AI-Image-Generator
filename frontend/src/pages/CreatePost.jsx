import React, { useState } from 'react'
import { preview } from '../assets'
import { useNavigate } from 'react-router-dom'
import { getRandomPrompts } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: ''
    })
    const [generating, setGenerating] = useState(false)
    const [loading, setLoading] = useState(false)

    const generateImg = async () => {
        if(form.prompt){
            try {
                setGenerating(true)
                const response = await fetch('http://localhost:8000/api/dalle',{
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({ prompt: form.prompt }),
                })

                const data = await response.json()

                setForm({...form,photo: `data:image/jpeg;base64,${data.photo}`})
            } catch (error) {
                console.log(error)
            } finally{
                setGenerating(false)
            }
        } else {
            alert('Please Enter a prompt')
        }
    }

    const handleSubmit = () => {
        
    }

    const handleChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value})
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompts(form.prompt)
        setForm({...form,prompt: randomPrompt})
    }

    return (
        <section className='max-2-7xl mx-a'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>Create </h1>
                <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'> Create imaginative and visually stunning images generated through DALL-E AI and share with the community</p>
            </div>
            <form className='mt-16 max-w-3xl' onSubmit={handleSubmit} >
                <div className='flex flex-col gap-5'>
                    <FormField
                        labelName="Your name"
                        type="text"
                        name="name"
                        placeholder="Kalp Prajapati"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="A man standing in front of a stargate to another dimension"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                    <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
                        {
                            form.photo ? (
                                <img 
                                
                                    src={form.photo}
                                    alt={form.prompt}
                                    className='w-full h-full object-contain'
                                />
                            ) : (
                                <img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40' />
                            )
                        }
                        {
                            generating && (
                                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                                    <Loader/>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='mt-5 flex gap-5'>
                    <button
                        type='button'
                        onClick={generateImg}
                        className='text-white bg-black font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                    >
                        {generating ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                <div className='mt-2 text-[#666e75] text-[14px]'>
                    <p>Once you have created the image you want, you can share with others in the community</p>
                    <button
                        type='submit'
                        className='mt-3 text-white bg-[#6469ff] font-medium rounded-md  text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                    >
                        {loading ? "Sharing..." : "Share with the communty"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost
