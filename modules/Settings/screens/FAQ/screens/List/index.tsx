import React from 'react';
import { FlatList } from 'react-native';

import { Accordion } from '@/components/Accordion';

import * as S from './styles';

const faqs = [
  {
    id: 1,
    title: 'Como faço para montar um look?',
    description:
      'Para montar um look no nosso aplicativo, siga os seguintes passos:\n\n1. Abra o aplicativo e faça login na sua conta.\n2. Navegue pelo catálogo de peças disponíveis ou adicione as suas próprias peças ao aplicativo.\n3. Selecione as peças de roupa que você deseja incluir no seu look, arrastando e soltando-as na área de montagem.\n4. Experimente diferentes combinações e arrume as peças até ficar satisfeito com o resultado.\n5. Salve o look para poder acessá-lo posteriormente ou compartilhá-lo com seus amigos.\n\nLembrando que você também pode adicionar acessórios e personalizar detalhes do look, como cores e estampas, para deixá-lo ainda mais único.',
  },
  {
    id: 2,
    title: 'Como posso salvar meus looks?',
    description:
      'Para salvar seus looks no nosso aplicativo, siga as instruções abaixo:\n\n1. Certifique-se de estar logado na sua conta no aplicativo.\n2. Após montar o look desejado, clique no botão "Salvar" ou no ícone de coração.\n3. Será exibida uma caixa de diálogo onde você poderá nomear o look e adicionar tags para facilitar a busca futura.\n4. Após preencher as informações, clique em "Salvar" novamente para concluir o processo.\n\nSeus looks salvos serão armazenados na sua conta e estarão disponíveis sempre que você acessar o aplicativo.',
  },
  {
    id: 3,
    title: 'É possível importar minhas próprias peças de roupa para o aplicativo?',
    description:
      'Sim, você pode importar suas próprias peças de roupa para o aplicativo. Para fazer isso, siga estas etapas:\n\n1. Acesse a seção "Minhas Peças" ou "Adicionar Peças" no aplicativo.\n2. Escolha a opção de importar peças e selecione as imagens das suas peças de roupa da galeria do seu dispositivo.\n3. O aplicativo irá processar as imagens e adicioná-las à sua coleção de peças disponíveis para montar looks.\n\nLembre-se de que o aplicativo pode exigir que as imagens estejam em um formato específico ou tenham determinadas características para garantir a melhor experiência de uso.',
  },
  {
    id: 4,
    title: 'Posso compartilhar meus looks com outras pessoas?',
    description:
      'Sim, você pode compartilhar seus looks com outras pessoas. O aplicativo oferece algumas opções para compartilhamento, incluindo:\n\n1. Compartilhar nas redes sociais: Você pode conectar suas contas de redes sociais ao aplicativo e compartilhar seus looks diretamente em plataformas como Instagram, Facebook e Twitter.\n2. Compartilhar por e-mail ou mensagem: Você também pode enviar seus looks por e-mail ou mensagens, bastando selecionar a opção de compartilhamento desejada e inserir os destinatários.\n3. Gerar um código ou link de compartilhamento: O aplicativo permite gerar um código ou link único para o seu look, que pode ser compartilhado com outras pessoas para que elas possam visualizá-lo diretamente no aplicativo.\n\nEscolha a opção de compartilhamento que melhor se adequa às suas necessidades e divirta-se compartilhando seus looks!',
  },
  {
    id: 5,
    title: 'Posso salvar looks de outras pessoas e usá-los como inspiração?',
    description:
      'Sim, você pode salvar looks de outras pessoas para usar como inspiração. O aplicativo oferece a opção de explorar looks criados por outros usuários e salvá-los na sua conta. Para fazer isso, siga estas etapas:\n\n1. Navegue pela seção de "Looks Inspiração" ou "Comunidade" no aplicativo.\n2. Encontre um look que você goste e queira salvar.\n3. Clique no botão "Salvar" ou no ícone de coração associado ao look para adicioná-lo à sua coleção.\n\nAo salvar looks de outras pessoas, você poderá visualizá-los e usá-los como referência ao criar seus próprios looks.',
  },
];

export function FAQList() {
  return (
    <S.ContainerDefault>
      <S.Container>
        <FlatList
          data={faqs}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ gap: 24 }}
          renderItem={({ item, index }) => (
            <Accordion active={index === 0} title={item.title} description={item.description} />
          )}
        />
      </S.Container>
    </S.ContainerDefault>
  );
}
