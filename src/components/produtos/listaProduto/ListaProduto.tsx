import { Box, Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Produto from "../../../model/Produto";
import { busca } from "../../../service/Service";
import { TokenState } from "../../../store/tokens/tokenReducer";

import './ListaProduto.css';

function ListaProduto() {

  let history = useNavigate()

  const [produtos, setProdutos] = useState<Produto[]>([])

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );


  useEffect(() => {
    if (token === "") {
      toast.warn('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      history("/login")
    }
  }, [token])

  async function getProduto() {
    await busca("/produtos/todos", setProdutos, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getProduto()
  }, [produtos.length])

  return (
    <>
      {
        produtos.map(produto => (
          <Box m={2} >
            <Card variant="outlined">
              <CardContent>

                <Typography color="textSecondary" gutterBottom>
                  Produto
                </Typography>

                <Typography variant="h5" component="h2">
                  {produto.nome}
                </Typography>

              </CardContent>

              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5} >

                  <Link className="text-decoration-none" to={`/deletarProduto/${produto.id}`}>
                    <Box mx={1}>
                      <Button variant="contained" size='small' >
                        Deletar
                      </Button>
                    </Box>
                  </Link>

                  <Link className="text-decoration-none" to={`/criarProduto/${produto.id}`} >
                    <Box mx={1}>
                      <Button variant="contained" size='small' >
                        Atualizar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>

            </Card>
          </Box>
        ))}
    </>
  )
}

export default ListaProduto;