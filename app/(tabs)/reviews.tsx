import ConfirmationPopup from "@/components/ConfirmationPopup";
import { ReviewThumb } from "@/components/ReviewItem";
import Error from "@/components/error";
import Loading from "@/components/loading";
import { db } from "@/db/read";
import { deleteReview } from "@/db/write";
import { AppContext } from "@/store/AppStore";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

// const MOCK_DATA = [
// 	{
// 		image: "https://th.bing.com/th/id/OIP.6liHYghlts2rF1Zs_jQ6PgHaGQ?rs=1&pid=ImgDetMain",
// 		review: "É possível fazer uma associação entre um pneu e o fascismo japonês através de um contexto histórico específico. Durante a Segunda Guerra Mundial, o Japão estava sob um regime fascista liderado pelo partido político militarista conhecido como o Partido da Associação de Assistência Nacional. Durante esse período, a economia japonesa estava voltada para a produção de bens militares e para o apoio à máquina de guerra imperial.\n\nRelacionar um pneu com o fascismo japonês poderia ser feito através do papel da indústria de pneus durante a guerra. No contexto da mobilização para a guerra, as indústrias japonesas, incluindo as de pneus, foram direcionadas para apoiar os esforços militares do país. Poderíamos, então, associar um pneu ao fascismo japonês como um símbolo da economia de guerra, onde os recursos e a produção industrial estavam a serviço do regime autoritário e expansionista do Japão durante aquele período.\n\nAlém disso, é importante notar que o Japão expandiu agressivamente seu império durante os anos 1930 e início dos anos 1940, invadindo e colonizando várias regiões da Ásia e do Pacífico. Essa expansão imperialista estava intimamente ligada à ideologia do fascismo japonês, que buscava dominar territórios vizinhos e impor seu domínio sobre eles. Enquanto o império japonês avançava, poderia-se argumentar metaforicamente que era como um pneu que esmaga tudo em seu caminho, uma representação da brutalidade e da dominação associadas ao fascismo japonês durante a Segunda Guerra Mundial.",
// 		tags: ["Pneu", "China", "Japonês", "Chinês", "Coreia", "Asiático"],
// 		title: "A Relação de Pneu e o Fascismo Japonês",
// 		uid: "-Nr7yy_qTlhWji_39wNg",
// 	},
// 	{
// 		image: "https://m.media-amazon.com/images/M/MV5BYmEyZjkwN2QtYjIwYy00NGY3LWE1NDQtNjBjMWEwNjk3NmVjXkEyXkFqcGdeQXVyOTA1ODU0Mzc@._V1_.jpg",
// 		review: 'Certa vez fui visitar meu primo mais novo (9 anos) e percebi que ele estava jogando um jogo de luta onde os bonecos eram altamente desproporcionais, tendo a cabeça 10x maior que o corpo, curioso, perguntei a ele educadamente"que jogo é esse?" e ele me respondeu "brawheilla". Sendo um amante de jogos, eu decidi deixar meus preconceitos de lado e jogar esse jogo que meu primo tanto ama. Após jogar o game por aproximadamente 300h, como esperado, o jogo é extremamente pífio: animações sem graça, o modo rankeado é pensado para causar estresse intenso no jogador, a playerbase é composta de viadinhos e maricas que não aguentam ouvir a verdade (eu acabei banido temporariamente do jogo apenas por ter chamado um jogador de "macaco orfão baitola e "spammer sem mãe"), o jogo não possui um sistema de divisão de rank (muitas vezes fui obrigado a jogar com players de ranks diversas vezes melhores que o meu), e para piorar tudo, descobri que o jogo foi desenvolvido pela merda da Ubisoft. Enfim acredito que com a presente discertação foi possível compreender o quão péssimo esse jogo é. 0/10, não recomendo.',
// 		tags: [
// 			"Luta",
// 			"Cearense",
// 			"Pífio",
// 			"Infantil",
// 			"Meu primo de 9 anos joga isso",
// 		],
// 		title: "Brawheilla",
// 		uid: "asG98DG12G2",
// 	},
// 	{
// 		image: "https://assets.eyefilm.nl/images/production/_1200x630_crop_center-center_none/Eye-on-Sound-Whiplash-Damien-Chazelle-US-2014.jpg",
// 		review: "Um filme incrivel com uma jornada emocionante, com muito dra, desenvolvimento de persongem e bastante amor a musica.\ncom um bom elenco e uma otima direção, esse filme consegue \nmanipular seus sentimentos da forma que quer, fazendo o  telespectador sentir raiva, anciedade, apreeção e felicidade ao simples final de um concerto.\nUm otimo filme com um belo final, 10/10 mais que recomendado.",
// 		tags: ["whiplash", "drama", "romance?", "amor", "musica"],
// 		title: "whiplash em busca da perfeição",
// 		uid: "asG98DG12G3",
// 	},
// 	{
// 		image: "https://lrmonline.com/wp-content/uploads/2022/11/unnamed-14.jpg",
// 		review: "Oq dizer de uma das melhores experiencias q tive com jogos soulslike, Joguei uma primeira vez e n  consegui passar da fase inicial pela sua dificuldade extrema e altamente punitiva , dropei o game com apenas algumas poucas horas mas apos um tempo resolvi dar uma nova chance e simplismente me apaixonei pelo game, sua mecanica de combate complexa e muito desafiadora, tem uma grande curva de aprendizagem mas quando passamos por ela e conseguimos aproveitar oq o jogo tem a lhe proporcionar  em termos de combate, isso acaba se tornando uma experiencia incrivel. Sua historia é intrigante e prende sua atenção, com personagens carismaticos e poderosos, com uma atmosfera envolvente e densa.super recomendo para os amantes de jogos desafiadores. Nota 7.8/10",
// 		tags: [
// 			"nioh",
// 			"soulslike",
// 			"desafio",
// 			"morte",
// 			"sofrimente",
// 			"satisfação",
// 		],
// 		title: "Nioh",
// 		uid: "asG98DG12G6",
// 	},
// 	{
// 		image: "https://assetsio.gnwcdn.com/nioh-2-knallharte-fortsetzung-1568905192879.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
// 		review: 'Com uma bela evolução em relação ao seu primeiro titulo temos nioh 2, um jogo excepcional no que se proponhe, com uma vasta gama de conteúdos e uma história intrigante.\nNioh 1 foi um título muito bom, com ótima gameplay e conteúdos extras mas nioh 2 deu um passo além, trazendo tudo que havia de bom no primeiro título e refinando ao máximo e adicionando novos elementos de gameplay e mecânicas. Uma nova mecânica muito bem vinda foi a de você poder se transformar em um yokai, aumentando assim suas possibilidades no meio do combate tornando-o ainda mais profundo. Esse game é uma ótima sequência do seu primeiro jogo e me passou bastante a sensação de sair de um "GOW 1" para o "GOW 2". Se você gostou do primeiro titulo vai gostar ainda mais desse segundo jogo, recomendo de mais pra quem gosta de um bom souls like com alta dificuldade. Nota 8.5/10.',
// 		tags: [
// 			"nioh2",
// 			"soulslike",
// 			"desafio",
// 			"morte",
// 			"sofrimente",
// 			"satisfação",
// 		],
// 		title: "Nioh 2",
// 		uid: "asG98DG12G89",
// 	},
// ];

export default function Reviews() {
	const [reviews, setReviews] = useState<Review[] | null>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { popupShown, showPopup, reviewId } = AppContext();

	useEffect(() => {
		setLoading(true);
		try {
			db.ref("/reviews").on("value", (data) => {
				if (data.exists()) {
					const reviewData = data.val();
					const keys = Object.keys(reviewData);
					const val = keys.map((key) => {
						reviewData[key].uid = key;
						return reviewData[key];
					});
					setReviews(val);
				} else {
					setReviews(null);
				}
				setLoading(false);
			});
		} catch (error) {
			setError(true);
		}
	}, []);

	function deleteReviewHandler() {
		deleteReview(reviewId);
		showPopup(false);
	}

	if (loading) return <Loading />;
	if (error) return <Error />;

	return (
		<>
			{popupShown && (
				<ConfirmationPopup
					deleteHandler={deleteReviewHandler}
					confirmationText="Essa review será deletada para sempre"
				/>
			)}
			{!reviews && !loading && (
				<Text className="text-white font-[Poppins] text-lg">
					Não há reviews
				</Text>
			)}
			{reviews && (
				<FlatList
					className="p-6 bg-black"
					data={reviews}
					keyExtractor={(item) => item.uid!}
					renderItem={({ item }) => <ReviewThumb data={item} />}
				/>
			)}
		</>
	);
}
