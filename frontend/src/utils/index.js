import {surpriseMePrompts} from '../constants'

export function getRandomPrompts(prompt){
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length )
    const randomPrompt = surpriseMePrompts[randomIndex]

    if(randomPrompt === prompt ) return getRandomPrompts(prompt)

    return randomPrompt
}