import EmbedReactNative, { EmbedReactNativeEventEmitter, Gr4vyEvent } from '@gr4vy/embed-react-native';
import { useEffect } from 'react';
import { Button } from 'react-native';

const GR4VY_ID = '[GR4VY_ID]'
const TOKEN='[TOKEN]'

const handleCheckout = () => {
  EmbedReactNative.showPaymentSheet({
    gr4vyId: GR4VY_ID,
    environment: 'sandbox',
    token: TOKEN,
    amount: 1299,
    currency: 'AUD',
    country: 'AU',
  })
}

export const Embed = () => {
  const onEvent = (event: Gr4vyEvent) => {
    const { name, data } = event
    console[name === 'generalError' ? 'error' : 'log'](name, data)
  }
  
  useEffect(() => {
    const onEventSubscription = EmbedReactNativeEventEmitter.addListener(
      'onEvent',
      onEvent
    )
  
    return () => {
      onEventSubscription.remove()
    }
  }, [])

  return <Button onPress={handleCheckout} title="Pay" />
}