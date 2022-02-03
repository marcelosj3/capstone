import { useState } from "react";
import { Grid, Heading, VStack, Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import { Input } from "../Register/Input";

interface ILoginData {
  email: string;
  password: string;
}

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Por favor, digite seu email")
    .email("Por favor, digite um email válido"),
  password: yup.string().required("Por favor, digite sua senha"),
});

export const LoginForm = () => {
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ILoginData>({
    resolver: yupResolver(LoginSchema),
  });

  const handleLogin = (data: ILoginData) => {
    setLoading(true);
    signIn(data)
      .then((_) => {
        setLoading(false);
        navigate("/donate");
      })
      .catch((_) => setLoading(false));
  };

  return (
    <Grid
      onSubmit={handleSubmit(handleLogin)}
      as="form"
      w={["100%"]}
      maxW={["300px", "400px"]}
      padding="30px 15px"
      bg="transparent"
      color="gray.300.100"
    >
      <Heading
        fontSize={["1xl", "3xl"]}
        fontWeight="normal"
        textAlign="center"
        lineHeight={["30px", "48px"]}
      >
        Estou pronte para mudar o mundo!
      </Heading>
      <VStack spacing="4" mt="6">
        <Input
          placeholder="Digite seu email"
          type="text"
          error={errors.email}
          {...register("email")}
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          error={errors.password}
          {...register("password")}
        />
        <Button
          isLoading={loading}
          bg="primary.350"
          w="100%"
          color="gray.300.100"
          h={["40px", "48px"]}
          borderRadius="8px"
          _hover={{
            background: "primary.300",
          }}
          type="submit"
        >
          Entrar
        </Button>
        <Text color="gray.250">
          Ainda não possui uma conta? Faça o seu cadastro!
        </Text>
        <Button
          isLoading={loading}
          bg="transparent"
          border="1px solid"
          borderColor="secondary.300"
          w="100%"
          color="secondary.300"
          h={["40px", "48px"]}
          borderRadius="8px"
          _hover={{
            background: "secondary.250",
            color: "gray.100.100",
          }}
          onClick={() => navigate("/register")}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  );
};
